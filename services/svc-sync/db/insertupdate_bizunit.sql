
CREATE OR REPLACE FUNCTION app_private.insert_update_bizunit(bizunit jsonb)
    RETURNS json
    LANGUAGE 'plpgsql'
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
DECLARE retValue JSON;
DECLARE rowValue record;
DECLARE parentIdValue UUID;
BEGIN

PERFORM app_private.ensure_json_schema(bizunit, 'title');

IF (bizunit ? 'parentId') THEN
  parentIdValue = (bizunit->>'parentId')::UUID;
ELSE
    SELECT id INTO parentIdValue FROM app_hidden.company_unit WHERE parent_id is NULL;
END IF;

IF (bizunit ? 'id') IS FALSE THEN
    WITH rows as (
        INSERT INTO app_hidden.company_unit(title, parent_id)
        VALUES (
            bizunit ->> 'title',
            parentIdValue
        )
        RETURNING *
   ) SELECT id, parent_id as "parentId", title, description INTO rowValue FROM rows;
END IF;

RETURN to_json(rowValue);

END;
$BODY$;

CREATE OR REPLACE FUNCTION app_private.ensure_json_schema(j jsonb, fieldArr text)
    RETURNS BOOLEAN
    LANGUAGE 'plpgsql'
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
DECLARE r record;
BEGIN

    FOR r IN select string_to_table(fieldArr,',') as field_name LOOP
        /* check existence and emptiness */
        IF (j ? r.field_name) IS FALSE OR j->>r.field_name='' THEN
          RAISE EXCEPTION 'Badly formed json. Missing "%" field', r.field_name;
        END IF;

    END LOOP;

    RETURN TRUE;
END;
$BODY$;

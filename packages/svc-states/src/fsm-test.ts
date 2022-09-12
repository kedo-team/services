import { createMachine, actions as xActions, assign, interpret } from "xstate";

interface Context {
  state: "IN_PORGRESS" | "APPROVED" | "REJECTED";
  entity_id?: string;
}

///const addWater = assign()
const actions = {
  creating_entity: () => console.log("hui"),
};

const isApproved = (ctx: Context, e) => {
  console.log(e)
  return e.type === "Done"
}

const approveMachine = createMachine<Context>(
  {
    id: "approveMachine",
    initial: "idle",
    predictableActionArguments: true, // ref: https://xstate.js.org/docs/guides/actions.html#actions
    context: {
      state: "IN_PORGRESS",
    },
    states: {
      // technical state
      idle: {
        on: {
          USER_REQUEST: {
            target: "creating_entity",
            //actions: ["create_entity"],
          },
        },
      },
      // put entity to storage
      creating_entity: {
        entry: ["create_entity"],
        on: {
          ENTITY_CREATED: {
            target: "approvement",
            actions: ["notify_user"],
          },
          ENTITY_CANCELED: {
            target: "failure",
            actions: ["notify_user"],
          },
        },
      },
      approvement: {
        initial: "pendingBossApprovement",
        states: {
          pendingBossApprovement: {
            tags: ["approvement"],
            entry: ["create_task"],
            on: {
              APPROVED: {
                target: "pendingEmployeeApprovement",
                actions: ["notify_user"],
              },
              REJECTED: {
                target: "requestRejected",
                actions: ["notify_user"],
              },
            },
          },
          pendingEmployeeApprovement: {
            tags: ["approvement"],
            entry: ["create_task"],
            on: {
              APPROVED: {
                target: "requestApproved",
                actions: ["notify_user"],
              },
              REJECTED: {
                target: "requestRejected",
                actions: ["notify_user"],
              },
            },
          },
          requestApproved: {
            type: "final",
          },
          requestRejected: {
            type: "final",
          },
        },
        onDone: [
          { target: "sentToHraDep", cond: "isApproved" },
          { target: "rejected" },
        ],
      },
      sentToHraDep: {
        type: "final",
      },
      failure: {
        type: "final",
      },
      rejected: {
        type: "final",
      },
    },
  },
  {
    guards: {
      isApproved,
    },
  }
)

const service = interpret(approveMachine).onTransition((state) => {
  console.log(state.value);
})

service.onTransition(state => console.log(state.value))

service.start()

debugger
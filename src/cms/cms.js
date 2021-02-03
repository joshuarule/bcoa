import CMS from "netlify-cms-app";
import Projects from "./projects";

CMS.registerPreviewTemplate("projects", Projects);
CMS.registerPreviewStyle("./cms.css");

CMS.registerEventListener({
  name: "preSave",
  handler: async ({ entry }) => {
    const data = await JSON.parse(await JSON.stringify(entry.get("data")));
    if (data.templateKey === "project") {
      console.warn("----PROJECT----");
      console.log("entry", entry);
      console.log(window.localStorage.getItem("netlify-cms-user"));
    }
    //   return;

    // if entry is a project
    // check if it exists in projects page
    // add project to work projects relation at the front

    // console.log("data", data);
    // if (data.templateKey !== "events" && data.templateKey !== "cafeteriaItems")
    //   return;
    // console.log("data is event or cafeteriaItem");
    // if (data.uid) {
    //   console.log("data has uid");
    //   setEvent(data.templateKey, data);
    // } else {
    //   console.log("data is new event");
    //   const ref = await createEvent(data.templateKey, data);
    //   console.log("after create", ref.id);
    //   return entry.get("data").set("uid", ref.id);
    // }
  },
});

CMS.registerEventListener({
  name: "postUnpublish",
  handler: async ({ entry }) => {
    console.log("entry", entry);

    // if entry is a project
    // remove project from work projects relation at the front

    // const data = await JSON.parse(await JSON.stringify(entry.get("data")));
    // console.log("data", data);
    // if (data.templateKey !== "events" && data.templateKey !== "cafeteriaItems")
    //   return;
    // console.log("data is event or cafeteriaItem");
    // if (data.uid) {
    //   console.log("data has uid");
    //   deleteEvent(data.templateKey, data);
    // }
  },
});

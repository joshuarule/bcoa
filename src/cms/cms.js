import CMS from "netlify-cms-app";
import Projects from './projects';

CMS.registerPreviewTemplate("projects", Projects);
CMS.registerPreviewStyle("./cms.css");

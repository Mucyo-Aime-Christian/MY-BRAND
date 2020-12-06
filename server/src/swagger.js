import swaggerUi from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
const Definitions = () => ({
  info: {
    title: "Mr Chris Portfolio",
    description: " Mr Chris website and blog portfolio ",
  },
  schemes: ["http", "https"],
  basePath: "/api/",
  produces: ["application/json"],
});

const swaggerDocs = swaggerJSDocs({
  swaggerDefinition: Definitions(),
  apis: ["src/routes/*.js"],
});
//Extended: https://wagger.io/specification/#infoObject
const docsOption = {
  customSiteTitle: "MY-BRAND",
};
export const setUpSwaggerUi = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.serveFiles(swaggerDocs, docsOption)
  );
  app.get("/api-docs", (req, res) => {
    return res.send(swaggerUi.generateHTML(swaggerDocs, docsOption));
  });
};
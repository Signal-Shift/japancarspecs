/** Machine-readable API description (OpenAPI 3.1) for importer integration. */
export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "JapanCarSpecs Importer API",
    version: "0.1.0",
    description:
      "Stub phase: authenticate with an organization API key. POST /v1/reports returns a JDM Technical Data Report JSON contract (no live MLIT or gateway yet). Not manufacturer paperwork from the OEM.",
  },
  servers: [
    {
      url: "/api",
      description: "Same origin (Next.js Route Handlers)",
    },
  ],
  paths: {
    "/v1/reports": {
      post: {
        operationId: "createReportStub",
        summary: "Request a JDM Technical Data Report (stub contract preview)",
        security: [{ ApiKeyAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  market: {
                    type: "string",
                    enum: ["ie", "uk", "eu"],
                    description: "Defaults to ie (Ireland-first copy semantics).",
                  },
                  chassisHint: {
                    type: "string",
                    description:
                      "Optional chassis reference; echoed as importer_supplied in stub until gateway is live.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Stub report with populated JDM TDR schema",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
          "401": { description: "Missing or invalid API key" },
        },
      },
    },
    "/openapi": {
      get: {
        operationId: "getOpenApi",
        summary: "OpenAPI document for this stub API",
        responses: {
          "200": {
            description: "OpenAPI JSON",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "jcs_live_...",
        description:
          "Issue keys from the importer dashboard after signing in. Keys are shown once in full.",
      },
    },
  },
} as const

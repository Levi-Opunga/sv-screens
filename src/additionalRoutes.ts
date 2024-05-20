import type {
  InferParamFromPath,
  AllParamNames,
  InferParam,
  ExtractParserReturnTypes,
} from "typesafe-routes";
import { route, stringParser } from "typesafe-routes";
const accountRoute = route(
  "/account/:accountId",
  {
    accountId: stringParser, // parser implicitly defines the type (string) of 'accountId'
  },
  {}
);

type R = InferParamFromPath<"tools/:screenName/:alias">;

const additionalRoutes = {
  alias: () => import("./screens/tools.svelte"),
};

export default additionalRoutes;

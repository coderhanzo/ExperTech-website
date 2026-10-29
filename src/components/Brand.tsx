import { site } from "../data/site";

export function Brand() {
  return <span className="brand">
    <img className="brand-mark" src="/favicon.svg" width="44" height="50" alt="" aria-hidden="true" />
    <span>{site.name}<small>{site.suffix}</small></span>
  </span>;
}

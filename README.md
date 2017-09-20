# ICS Merger Screenshot Plugin

Takes a screenshot of the calendar on the current page.

## Building

The `sign` `package.json` script expects an `.env.sh` that exports your addons.mozilla.org api key and secret.

Adding that and changing the `content_scripts.matches` array in `manifest.json` should be all that's required to build the addon to work on other domains.

Once that's done, run `yarn build && yarn sign` or `npm run build && npm run sign`.

[Screenshot icon by Tomas Knopp from Noun Project][icon].

[icon]: https://thenounproject.com/term/snapshot/1182526
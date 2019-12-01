How to contribute
=================
Thanks in advance for you interest — every contribution is welcome! Here are some basic rules we follow.

This repo folows conventions of [Semver](https://semver.org) (maintained automatically by [`semantic-release`](https://github.com/semantic-release/semantic-release)) 
and [Angular commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). We recommend using [commitizen](https://github.com/commitizen/cz-cli) to insure commit message compliance. 

## Testing
You can use `yarn test` and `yarn test --watch` for unit tests, there is also working [WallabyJS](https://wallabyjs.com) configuration in place.

Test files follow the naming pattern `*.spec.ts` and are to be placed next to the tested units, no `/test/` folders, please.

## Submitting changes
When submitting a PR, please write down a clear list of changes you've made. We also prefer small commits to big ones, WIP commits are OK.

Please, don't `git commit` — use [commitizen's git cz](https://github.com/commitizen/cz-cli) instead, unless you're willing to format your commit messages by hand. 
Every ill-formated commit is interpreted as a `chore`,  wich might mess with our semver. You can fix ill-formated commit messages with commititzen using `git cz --amend`.

## Code of conduct
We don't have one yet — so please, be chill.
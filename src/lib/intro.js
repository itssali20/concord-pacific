// Resolves when the first-load preloader has finished, so hero animations can start in sync.
let resolveFn
export const introDone = new Promise((r) => (resolveFn = r))
export const finishIntro = () => resolveFn && resolveFn()

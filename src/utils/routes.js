import { routes } from "route";

export function getRoute(name, param = []) {
    const route = routes.find(route => route.name === name);
    let path = route?.path;
    let newPath = path;
    if (route?.path) {
        let colonBool = path.includes(':');
        if (colonBool) {
            const colonArr = path.split(':');
            if ((colonArr.length - 1) !== param.length) {
                console.error('ERROR!!!. URL param length !== Fn() params length.\n', 'This route name:', name);
                return undefined
            }
            for (let i = 0; i < colonArr.length - 1; i++) {
                const colonIndex = newPath.indexOf(':');
                const slashIndex = newPath.indexOf('/', colonIndex);
                if (slashIndex !== -1) {
                    newPath = newPath.substring(0, colonIndex) + param[i] + newPath.substring(slashIndex);
                } else newPath = newPath.substring(0, colonIndex) + param[i]
            }
        }
    }
    return newPath;
}
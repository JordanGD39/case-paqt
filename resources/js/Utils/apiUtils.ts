export namespace ApiUtils {
    export function fetchData(routeName: string, data?: any): Promise<Response> {       
        return fetch(route(routeName, data), {
            method: "GET",
        }).then((response) => response.json());
    }

    export const defaultCatch = (error: any) => console.log(error);

    export function formatLocation(locString: string) {
        const locArray = locString.split("-");
      
        return `X: ${locArray[0]} Y: ${locArray[1]}`;
    }

    export function getIdFromUrl() {
        const { pathname } = window.location;
        const splitPathname = pathname.split("/");
        return  splitPathname[splitPathname.length - 1];;
    }
}
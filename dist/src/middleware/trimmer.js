//#region Trim Post Requests
export const postTrimmer = (req, res, next) => {
    if (req.method === 'POST') {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value === 'string')
                req.body[key] = value.trim();
        }
    }
    next();
};
//#endregion

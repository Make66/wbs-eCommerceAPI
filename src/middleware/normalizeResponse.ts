import type { Request, Response, NextFunction } from 'express';

function normalize(obj: unknown): unknown {
    if (Array.isArray(obj)) return obj.map(normalize);
    if (obj !== null && typeof obj === 'object') {
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            if (key === '__v') continue;
            const newKey = key === '_id' ? 'id' : key;
            result[newKey] = normalize(value);
        }
        return result;
    }
    return obj;
}

export function normalizeResponse(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json.bind(res);
    res.json = (body) => originalJson(normalize(JSON.parse(JSON.stringify(body))));
    next();
}
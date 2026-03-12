import type { Document, InferSchemaType, ObjectId } from 'mongoose';
import type { CategoryDocumentType, OrderDocumentType, ProductDocumentType, UserDocumentType } from '#model';

declare global {
    namespace Express {
        export interface Request {
            customProperty?: string;
            category?: CategoryDocumentType;
            order?: OrderDocumentType;  
            product?: ProductDocumentType;
            user?: UserDocumentType;
        }
    }
}

export { };
import type { Request, Response } from "express";
export declare class RolesController {
    private readonly prisma;
    constructor(prisma: any);
    becomeOrganizer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=roles.d.ts.map
import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inquiriesRouter from "./inquiries";
import performanceAiRouter from "./performance-ai";
import performanceIpoRouter from "./performance-ipo";
import performanceBondsRouter from "./performance-bonds";
import performanceMezzanineRouter from "./performance-mezzanine";

const router: IRouter = Router();

router.use(healthRouter);
router.use(inquiriesRouter);
router.use(performanceAiRouter);
router.use(performanceIpoRouter);
router.use(performanceBondsRouter);
router.use(performanceMezzanineRouter);

export default router;

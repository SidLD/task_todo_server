import { Subject } from "../models/userSchema";

export class SubjectController {
    static async createSubject(req: any, res: any) {
        try {
            const subject = new Subject(req.body);
            await subject.save();
            res.status(201).json(subject);
        } catch (err:any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getSubjects(req: any, res: any) {
        try {
            const subjects = await Subject.find();
            res.status(200).json(subjects);
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getSubjectById(req: any, res: any) {
        try {
            const subject = await Subject.findById(req.params.id);
            if (!subject) return res.status(404).json({ error: 'Subject not found' });
            res.status(200).json(subject);
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateSubject(req: any, res: any) {
        try {
            const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!subject) return res.status(404).json({ error: 'Subject not found' });
            res.status(200).json(subject);
        } catch (err:any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async deleteSubject(req: any, res: any) {
        try {
            const subject = await Subject.findByIdAndDelete(req.params.id);
            if (!subject) return res.status(404).json({ error: 'Subject not found' });
            res.status(200).json({ message: 'Subject deleted successfully' });
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }
}


import mongoose, { Schema } from 'mongoose';
import { IBudget } from '../util/interface';


const budgetSchema = new Schema<IBudget>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Self-reference for user
    },
    value: { type: Number, required: true },
    date: {
        dateFrom: { type: Date, required: true },
        dateTo: { type: Date, required: true },
    }

});

const Budget = mongoose.model<IBudget>('Budget', budgetSchema);

export default Budget;

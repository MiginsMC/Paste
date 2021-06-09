import { getModelForClass, prop } from '@typegoose/typegoose';
export class Paste {
	@prop({ required: true })
	_id!: string;

	@prop({ required: true })
	deleteId!: string;

	@prop({ required: true })
	content!: string;

	// These are automatically filled by Mongoose, they are just here for typings
	@prop({ required: false })
	createdAt!: Date;

	@prop({ required: false })
	updatedAt!: Date;
}

export const PasteModel = getModelForClass(Paste, {
	schemaOptions: { timestamps: true },
});

// Package Imports
import { ObjectId } from 'mongodb';

export const objectIdService = (Id: string): ObjectId => {
	let objectId = new ObjectId(Id);
	return objectId;
};

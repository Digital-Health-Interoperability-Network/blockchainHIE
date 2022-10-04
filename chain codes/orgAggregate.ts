/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from 'fabric-contract-api';
import Aggregates from './aggregate';

export class Cura extends Contract {

    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        const cars: Aggregates = 
            {
                numberOfDoctors: 10,
                numberOfPharmacists: 13,
                numberOfPharmacyTechnicians: 5,
                numberOfDentists: 6,
                numberOfDentalTechnicians: 4,
                numberOfNurses: 24,
                numberOfMidwifes: 9,
                numberofLabTechnicians: 11,
                numberOfLabScientists: 13,
                healthRecordAndHIMOfficers: 2,
                numberOfCommunityHealthWorkers: 15,
                numberOfCommunityHealthExtensionWorker: 16,
                numberOfJuniorComHealthExtensionWorker: 5,
                numberOfEnvironmentalHealthOfficers: 3,
                numberOfHealthAttendantOrAssistant: 20,
                status: true,
                lastSynced: new Date("2022-08-16T09:20:24.633+00:00"),
            }

            const res = await ctx.stub.putState('62f618fdfcaeea169cc835c1', Buffer.from(JSON.stringify(cars)));
            console.info('Added <--> ', res);
        console.info('============= END : Initialize Ledger ===========');
    }

    public async queryPersonnel(ctx: Context, id: string): Promise<string> {
        const carAsBytes = await ctx.stub.getState(id);
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    public async createPersonnel(ctx: Context,
        id: string, 
        numberOfDoctors:number,
        numberOfPharmacists:number,
        numberOfPharmacyTechnicians:number,
        numberOfDentists:number,
        numberOfDentalTechnicians:number,
        numberOfNurses:number,
        numberOfMidwifes:number,
        numberofLabTechnicians:number,
        numberOfLabScientists:number,
        healthRecordAndHIMOfficers:number,
        numberOfCommunityHealthWorkers:number,
        numberOfCommunityHealthExtensionWorker:number,
        numberOfJuniorComHealthExtensionWorker:number,
        numberOfEnvironmentalHealthOfficers:number,
        numberOfHealthAttendantOrAssistant:number,
        status:boolean,
        lastSynced:Date
        ) {
        console.info('============= START : Create Car ===========');

        const personnel: Aggregates = {
            numberOfDoctors,
            numberOfPharmacists,
            numberOfPharmacyTechnicians,
            numberOfDentists,
            numberOfDentalTechnicians,
            numberOfNurses,
            numberOfMidwifes,
            numberofLabTechnicians,
            numberOfLabScientists,
            healthRecordAndHIMOfficers,
            numberOfCommunityHealthWorkers,
            numberOfCommunityHealthExtensionWorker,
            numberOfJuniorComHealthExtensionWorker,
            numberOfEnvironmentalHealthOfficers,
            numberOfHealthAttendantOrAssistant,
            status,
            lastSynced: new Date(lastSynced)
        };

       const res = await ctx.stub.putState(id, Buffer.from(JSON.stringify(personnel)));
        console.info('============= END : Create Car ===========');
        console.info(res);
        return JSON.stringify(res);
    }

    public async queryAllPersonnels(ctx: Context): Promise<string> {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

}

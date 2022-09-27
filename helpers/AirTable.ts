import { config } from "dotenv";
import Airtable from "airtable";

config();

//Authenticate
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

//Base Initialization
const { AIRTABLE_BASE_ID }: any = process.env;
const base: any = Airtable.base(AIRTABLE_BASE_ID);

//Referance a table
export const localChapterTable = base(process.env.LOCAL_CHAPTER_TABLE_NAME);
export const schoolTable = base(process.env.SCHOOL_TABLE_NAME);
export const careerTable = base(process.env.CAREER_TABLE_NAME);
export const collaboratorTable = base(process.env.COLLABORATOR_TABLE_NAME);
export const guestTable = base(process.env.GUEST_TABLE_NAME);

//get Minified Records

export const minifyRecords = (records: any) => {
  return records.map((record: any) => getMinifiedRecords(record));
};

export const minifyRecordsOnSearch = (records: any) => {
  return records.map((record: any) => getMinifiedRecordsOnSearch(record));
};

//get a meaningful record

const getMinifiedRecords = (record: any) => {
  if (!record.fields.Password) {
    record.fields.Password = false;
  }
  return {
    id: record.id,
    fields: record.fields,
  };
};

const getMinifiedRecordsOnSearch = (record: any) => {
  if (!record.fields.Password) {
    record.fields.Password = false;
  }
  return record.fields;
};

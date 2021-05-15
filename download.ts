#!/usr/bin/env ts-node

import { writeFile } from 'fs/promises';
import axios from 'axios';
import { AxiosRequestConfig } from "axios";

var token = process.env.WK_APITOKEN;

if (!token) {
  console.log('Please set the environment variable WK_APITOKEN to hold a valid Wanikani API token.');
  process.exit(1);
}

const getSubjects = async (url: string, options: AxiosRequestConfig) => {
  const response = await axios.get(url, options);
  return response.data;
}

const onlyVerbs = (item) => {
  return item.data.parts_of_speech &&
    (item.data.parts_of_speech.includes("transitive verb") || 
     item.data.parts_of_speech.includes("intransitive verb"));
}

const toReducedVerb = (verb) => {
  return {
    verb: verb.data.characters,
    url: verb.data.document_url,
    level: verb.data.level,
    transitive: verb.data.parts_of_speech.includes("transitive verb"),
    types: verb.data.parts_of_speech,
    examples: verb.data.context_sentences,
    meanings: verb.data.meanings,
    readings: verb.data.readings
  }
}

const findVerbs = (data) => {
  return data
    .filter(onlyVerbs)
    .map(toReducedVerb);
}

const downloadDictionary = async (url, options) => {
  var result = [];

  while (url) {
    const data = await getSubjects(url, options);
    const page = findVerbs(data.data);
    result = result.concat(page);
    url = data["pages"]["next_url"];
  }

  return result;
}

const write = async (fileName, obj) => {
  const contents = JSON.stringify(obj);
  await writeFile(fileName, contents);
}

const convert = async () => {
  var url = 'https://api.wanikani.com/v2/subjects';
  const options: AxiosRequestConfig = { headers: { 'Authorization': 'Bearer ' + token } };
  const dictionary = await downloadDictionary(url, options);
  await write('./src/verbs.json', dictionary);
}

convert();

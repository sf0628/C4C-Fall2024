import express, { Express } from 'express';
//import axios from 'axios';
import { PartnerData, PartnerDetails, UserDetails, UserData } from './types';

const app: Express = express();
const port = 4000;

// Some partner data
const partners: PartnerData = {
  "sftt": {
    "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
    "name": "Speak For The Trees",
    "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater" +
      " Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory" +
      "(collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT" +
      "that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
    "active": true
  }
}

// Some admin data
const admins: UserData = {
  "admin": {
    "username": "admin",
    "password": "admin123"
  }
}

/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for the frontend so it can call the backend
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

/*
  APPLICATION ROUTES
*/

//endpoint to get all partners
app.get('/', (_req, res) => {
  res.status(200).send(partners);
})

//endpoint to delete a partner
app.delete('/partner/:key', (req, res) => {
  const key = req.params.key;
  if (partners[key]) {
    delete partners[key];
    res.status(200).send({message: 'Partner deleted'});
  } else {
    res.status(404).send({message: 'Partner not found'});
  }
})

//endpoint to add a partner
app.post('/partner', (req, res) => {
  const newPartner: PartnerDetails = req.body;
  const key = newPartner.name.toLowerCase();
  if (partners[key]) {
    res.status(400).send({message: 'Partner already exists' });
  } else {
    partners[key] = newPartner;
    res.status(201).send({message: 'Partner added' });
  }
})

//endpoint to get partners by title
app.get('/partner/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  //Object.entries converts into tuples [key, value]
  //.reduce converts array of entries back into PartnerData
  const filteredPartners = Object.entries(partners)
  .filter(([key, partner]) => partner.name.toLowerCase().includes(title))
  .reduce((obj, [key, partner]) => {
    obj[key] = partner;
    return obj;
  }, {} as PartnerData);
  res.status(200).send(filteredPartners);
});

//endpoint to get partners by active status
app.get('partner/status/:status', (req, res) => {
  const status = req.params.status === 'true';
  const filteredPartners = Object.entries(partners)
  .filter(([key, partner]) => (partner.active as boolean) === status)
  .reduce((obj, [key, partner]) => {
    obj[key] = partner;
    return obj;
  }, {} as PartnerData);
  res.status(200).send(filteredPartners);
});

//endpoint to handle admin login
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  const admin = admins[username.toLowerCase()];

  if (admin && admin.password === password) {
    res.status(200).send({message: 'Login successful' });
  } else {
    res.status(401).send({message: 'Login unsuccessful' });
  }
})

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})
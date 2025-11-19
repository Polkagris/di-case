This is a demo app for validating addresses and a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run

```bash
npm install
```

then start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

This demo app validates an address using the following parameters: street name, street number, city, and entrance letter.  
Only one address can be validated at a time, and only a single matching result will be displayed.  
The app will show three different status messages depending on the outcome:

1. No matching result found.
2. Multiple results found. In this case, the user is prompted to narrow the search with more specific parameters.
3. A single matching address found and validated.

When the validation button is pressed, a request is sent to the `streetName` API endpoint.  
This collects all relevant streetIds for the given address.  
Next, these streetIds are used as parameters in a second request to the `streetNumbers` API endpoint.
The streetnumber found from the API and the one used as a parameter are compared together with the streetname.
This returns a list of matching addresses. If more than one address matches, the user is prompted to refine the search to ensure only one result is returned.  
Once a single address matches the provided parameters, a checkmark is displayed along with the full validated address.

## TODO

List of features not yet implemented:

- Display more data when showing matching results — for example postal code, building type, floor numbers, and entrances.
- Support for validating more than one address at a time — for example by allowing an array of addresses to be passed to the validation function and running queries in a loop.
- A “clear input fields” button.
- Map integration for the matching address, using latitude and longitude to show the location (e.g., via a Google Maps iframe).
- Disable the validation button when required data is missing.
- Add more and better tests. For example add a test for more than one address found. Add one for no results found.

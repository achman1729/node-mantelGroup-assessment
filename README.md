### Instructions

This is a backed application and has no UI. To run this app,

- install postman or any other similar application

- node version is: v16.13.2

- npm version is: 8.1.2

- install the dependencies by npm i or npm ci

- to run the server on localhost: 3000 - npm run dev

- to run jest tests: npm run test

### Assumptions

- The log file is small and reading doesn't cause big delays

- The Log file can be empty

- The log file can be very small and may just have one or two logs

- The number of unique IP addresses has been calculated by extracting all the IP addresses from the log file and then finding the unique IP addresses in the list of IP addresses.

- IP addresses are within the range of 0.0.0.0 to 255.255.255.255 and in the standard IP address format

- The top 3 most visited URLs has been calculated by grouping the URLS by the number of times it has been hit. And then chosen the first element in the group. If there are no URLs that has been hit 2 or more than 2 times, then the first 3 element in the list of URLs is chosen. If there are only 2 URLs in the list then those are chosen keeping the third one as an empty string. And if there is only 1 URL in the list then one is shown with 2 empty strings.

- The top 3 most active IP addresses has been calculated by selecting 3 unique IP addresses that has been hit the latest.

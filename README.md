### Instructions

### Assumptions

- The number of unique IP addresses has been calculated by extracting all the IP addresses from the log and then finding the unique IP addresses in the list of IP addresses.

- The top 3 most visited URLs has been calculated by grouping the URLS by the number of times it has been hit. And then chosen the first element in the group. There are no URLs that has been hit 2 or more than 2 times, then the first 3 element in the list of URLs is chosen. If there are only 2 URLs in the list then those are chosen keeping the third one as an empty string. And if there is only 1 URL in the list then one is shown with 2 empty strings.

- The top 3 most active IP addresses has been calculated by selecting 3 IP addresses that has been hit the latest.

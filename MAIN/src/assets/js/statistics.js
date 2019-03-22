let no = document.getElementById('numOrganizers');
let na = document.getElementById('numActivities');
let nr = document.getElementById('numReserves');
let pc = document.getElementById('perCentCommitment')

function numToKMB(n) {
  if (n >= 1000000000) return `+${(n/1000000000)|0}B`;
  if (n >= 1000000) return `+${(n/1000000)|0}M`;
  if (n >= 1000) return `+${(n/1000)|0}K`;
  return `+${n}`;
}

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let ans = JSON.parse(xhr.responseText).data;
      no.innerText = numToKMB(ans.companies);
      na.innerText = numToKMB(ans.activities);
      nr.innerText = numToKMB(ans.reserves);
      pc.innerText = `${ans.commitment}%`;
    }
};
xhr.open("GET", "http://localhost:3000/SERVER/index.php/api/v0/statistics", true);
xhr.send();
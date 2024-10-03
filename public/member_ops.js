import { getCookie } from "./cookie_finder.js";

function handle_members(event) {
  console.log("DOM fully loaded and parsed");
  const resultsDiv = document.getElementById("results-div");
  const restOpsDiv = document.getElementById("rest-ops");
  const listMembersButton = document.getElementById("list-members");
  const createMemberButton = document.getElementById("create-member");
  const firstName = document.getElementById("member-firstName");
  const lastName = document.getElementById("member-lastName");
  const updateMemberButton = document.getElementById("update-member");
  const memberID = document.getElementById("member-id");
  const firstName1 = document.getElementById("member-firstName1");
  const lastName1 = document.getElementById("member-lastName1");
  const members_path = "/api/v1/members";
  const memberId2 = document.getElementById("member-id2");
  const showMember = document.getElementById("show-member");
  const deleteMember = document.getElementById("delete-member");
  const memberId3 = document.getElementById("member-id3");
  const listFacts = document.getElementById("list-facts");
  const memberId4 = document.getElementById("member-id4");
  const factText = document.getElementById("fact-text");
  const likes = document.getElementById("likes");
  const createFact = document.getElementById("create-fact");
  const memberId5 = document.getElementById("member-id5");
  const factNumber = document.getElementById("fact-number");
  const factText2 = document.getElementById("fact-text2");
  const likes2 = document.getElementById("likes2");
  const updateFact = document.getElementById("update-fact");
  const memberId6 = document.getElementById("member-id6");
  const factNumber2 = document.getElementById("fact-number2");
  const showFact = document.getElementById("show-fact");
  const deleteFact = document.getElementById("delete-fact");

  restOpsDiv.addEventListener("click", (event) => {
    if (event.target === listMembersButton) {
      fetch(members_path)
        .then((response) => {
          if (response.status === 200) {
            resultsDiv.innerHTML = "";
            response.json().then((data) => {
              let parag = document.createElement("P");
              parag.textContent = JSON.stringify(data);
              resultsDiv.appendChild(parag);
            });
          } else {
            alert(`Return code ${response.status} ${response.statusText}`);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (event.target === createMemberButton) {
      var dataObject = {
        first_name: firstName.value,
        last_name: lastName.value,
      };
      let headers = { "Content-Type": "application/json" };
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers["X-CSRF-Token"] = csrf_cookie;
      }
      fetch(members_path, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === updateMemberButton) {
      var dataObject = {
        first_name: firstName1.value,
        last_name: lastName1.value,
      };
      let headers = { "Content-Type": "application/json" };
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers["X-CSRF-Token"] = csrf_cookie;
      }
      fetch(`${members_path}/${memberID.value}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === showMember) {
      fetch(`${members_path}/${memberId2.value}`).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === deleteMember) {
      // Your code goes here!
      if (confirm('Are you sure you want to delete this member?')) {
            fetch(`/api/v1/members/${memberId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    alert('Member deleted successfully');
                    loadMembers(); // Refresh the member list
                } else {
                    throw new Error('Failed to delete member');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete member');
            });
        }
    } else if (event.target === listFacts) {
      fetch(`${members_path}/${memberId3.value}/facts`).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === createFact) {
      // Your code goes here!
      const factText = prompt('Enter the fact text:');
      if (factText) {
          fetch(`/api/v1/members/${memberId}/facts`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': csrfToken
              },
              body: JSON.stringify({ fact: { fact_text: factText, likes: 0 } }),
              credentials: 'include'
          })
          .then(response => {
              if (response.ok) {
                  alert('Fact created successfully');
                  loadFacts(memberId); // Refresh the facts list
              } else {
                  throw new Error('Failed to create fact');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Failed to create fact');
          });
      }
    } else if (event.target === updateFact) {
      // Your code goes here!
      const newFactText = prompt('Enter the new fact text:');
      if (newFactText) {
          fetch(`/api/v1/members/${memberId}/facts/${factId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': csrfToken
              },
              body: JSON.stringify({ fact: { fact_text: newFactText } }),
              credentials: 'include'
          })
          .then(response => {
              if (response.ok) {
                  alert('Fact updated successfully');
                  loadFacts(memberId); // Refresh the facts list
              } else {
                  throw new Error('Failed to update fact');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Failed to update fact');
          });
      }
    } else if (event.target === showFact) {
      fetch(`${members_path}/${memberId6.value}/facts/${factNumber2.value}`).then(
        (response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              resultsDiv.innerHTML = "";
              let parag = document.createElement("P");
              parag.textContent = JSON.stringify(data);
              resultsDiv.appendChild(parag);
            });
          } else {
            response
              .json()
              .then((data) => {
                alert(
                  `Return code ${response.status} ${
                    response.statusText
                  } ${JSON.stringify(data)}`,
                );
              })
              .catch((error) => {
                console.log(error);
                alert(error);
              });
          }
        },
      );
    } else if (event.target === deleteFact) {
      let headers = { "Content-Type": "application/json" };
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers["X-CSRF-Token"] = csrf_cookie;
      }
      fetch(`${members_path}/${memberId6.value}/facts/${factNumber2.value}`, {
        method: "DELETE",
        headers: headers,
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", handle_members(event));

const formEl = document.querySelector('.birthday-form');
const emailEl = document.querySelector('#email');
const usernameEl = document.querySelector('#username');
const otherPersonEl = document.querySelector('#other');
const birthdayEl = document.querySelector('#birthday');
const femaleGenderEl = document.querySelector('#female');
const maleGenderEl = document.querySelector('#male');

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.body.insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 2000);
};

const hideAlert = () => {
  const alertElement = document.querySelector('.alert');
  if (alertElement) {
    alertElement.parentElement.removeChild(alertElement);
  }
};

async function collectBirthdayData(
  email,
  username,
  otherPerson = '',
  birthday,
  gender
) {
  try {
    const details = {
      email,
      username,
      otherPerson,
      birthDay: birthday,
      gender,
    };
    const response = await fetch('/api/collectBirthDate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });
    if (response.status !== 201) {
      showAlert('fail', 'Something went wrong');
    } else {
      const data = await response.json();

      showAlert('success', data.message);
    }
  } catch (err) {
    console.log(err, '💥');
  }
}
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailEl.value;
  const username = usernameEl.value;
  const otherPerson = otherPersonEl.value || '';
  const birthday = birthdayEl.value;
  const gender = maleGenderEl.checked
    ? maleGenderEl.value
    : femaleGenderEl.value;
  await collectBirthdayData(email, username, otherPerson, birthday, gender);
  formEl.reset();
});

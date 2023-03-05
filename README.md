# <div align="center">Sekhmet</div>

## <div align="center">The Hospital of Heavens</div>

<br/>

## Routes

- `/user`:
    - GET: get all users in db
    - POST: add new user

- `/user/login`:
    - POST: login an existing user

- `/patient`:
    - GET: get all patients in db (with pcp name by joining with physician)
    - POST: add new patient

- `/patient/:ssn`
    - GET: get patient having this ssn (with all related info)

- `/patient/:ssn/appointment`
    - POST: appointment schedule

- `/patient/:ssn/test`
    - POST: test schedule

- `/patient/:ssn/discharge`
    - POST: discharge the patient

- `/physician`:
    - GET: get all physicians in db
    - POST: add new physician (next step if admin creates new doctor user)

- `/physician/:id`
    - GET: get physician having this id (with all related info) (Please use this same id in user table as well)

- `/physician/engagements`
    - GET: get all schedules of all physicians

- `/procedure`
    - GET: get all available procedures/tests

- `/procedure/:id`
    - PATCH: add result and file

- `/medication`
    - GET: get all medications

- `/appointment/:id`
    - GET: get appointment details
    - PATCH: add medication

- `/notify`
    - GET: send emails to all docs

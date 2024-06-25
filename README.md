# kf-qa-sanity-web

## Steps to use

### 1. Installation

Playwright framework requires [Node.js](https://nodejs.org/) v14+ to run.

Installing the dependencies.

```sh
npm ci
```

### 3. Execution

#### To run test suite use below command.

```sh
npm run test mmt01 #for windows
# or
npm run test @makeMyTrip #for macOS
```

#### To run individual test locally use below command.

```sh
export TEST_NAME=<TestFileName> && npm run local:test
```

**Note:** Using set command we are setting the local TestFileName.

#### To change any environment configuration in .env file at run time use set command.

Eg: To change the browser to Mozilla firefox use below command

```sh
export BROWSER=firefox
```

Similar command can be used to update other environment configuration

#### To generate Allure report use below command

```sh
npm run report
```

#### To generate HTML report use below command

```sh
npx playwright show-report test-results/results
```

### 4. Report & Logs

#### Playwright HTML report will be present inside

```sh
test-results/results/index.html
```

#### Execution log will be present in the log file.

```sh
test-results/logs/execution.log
```

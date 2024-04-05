/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'

export async function configure(_command: ConfigureCommand) {
  const codemods = await _command.createCodemods()

  // Create config file
  await codemods.makeUsingStub(stubsRoot, 'config/sentry.stub', {})

  // Add env validations
  try {
    await codemods.defineEnvVariables({
      SENTRY_DSN: '',
      SENTRY_TRACES_SAMPLE_RATE: '1.0',
    })

    await codemods.defineEnvValidations({
      leadingComment: 'Sentry environment variables',
      variables: {
        SENTRY_DSN: 'Env.schema.string.optional()',
        SENTRY_TRACES_SAMPLE_RATE: 'Env.schema.number.optional()',
      },
    })
  } catch (error) {
    console.error('Unable to define env variables/validations')
    console.error(error)
  }
}

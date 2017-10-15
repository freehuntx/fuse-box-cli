const yargs = require('yargs')
const { Sparky } = module.parent.require('fuse-box')

class FuseBoxCli {
  constructor() {
    this._options = {}
    this._taskDescriptions = {}
    this._initYargs()
    this._overrideSparkyStart()
  }

  init(settings = {}) {
    this._options = settings.options || {}
    this._taskDescriptions = settings.taskDescriptions || {}
    this.setOptions(this._options)

    return this
  }

  addOption(name, options = {}) {
    if (name === undefined) throw new Error('Undefined option name!')
    this._options[name] = options
    yargs.option(name, options)

    return this
  }

  _initYargs() {
    yargs
      .reset()
      .usage('Usage: $0 <task> [options]')
      .updateStrings({ 'Commands:': 'Tasks:' })
      .help(false)
      .version(false)
      .option('help', {
        alias: 'h',
        description: 'Show help',
        type: 'boolean'
      })
  }

  _parseTaskNames(taskNames = []) {
    taskNames.forEach(taskName => {
      let taskDesc = this._taskDescriptions[taskName] || ''

      if (taskName === 'default') {
        taskName = '\b\b* default'
        taskDesc = taskDesc || 'The default task'
      }

      /**
       * clean:cache or clean:dist caused an bug, where the task is not visible in the help
       * By appending \0 it works for some reason
       */
      yargs.command(taskName+'\0', taskDesc)
    })
  }

  _overrideSparkyStart() {
    Sparky.$start = Sparky.start

    Sparky.start = () => {
      this._onSparkyStart()
      return Sparky.$start()
    }
  }

  _onSparkyStart() {
    this._parseTaskNames(Array.from(Sparky.tasks.keys()))
    yargs.parse()

    if (yargs.argv.help) {
      yargs.showHelp()
      process.exit(0)
    }
  }

  // Getter / Setter
  setTaskDescriptions(descriptions = {}) {
    this._taskDescriptions = descriptions

    return this
  }

  setOptions(options = {}) {
    this._options = options
    yargs.options(options)

    return this
  }

  get options() {
    return Object.keys(this._options).reduce((prev, key) => {
      prev[key] = yargs.argv[key]
      return prev
    }, {})    
  }

  get $yargs() { return yargs }
}

module.exports = new FuseBoxCli()

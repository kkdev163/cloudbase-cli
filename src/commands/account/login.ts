import chalk from 'chalk'
import inquirer from 'inquirer'
import { login } from '../../auth'
import { listEnvs } from '../../env'
import { CloudBaseError } from '../../error'
import { checkAndGetCredential, loadingFactory } from '../../utils'
import { warnLog, errorLog } from '../../logger'

function printSuggestion() {
    const tips = `可使用下面命令继续操作：

${chalk.gray('–')} 创建免费环境

  ${chalk.cyan('$ cloudbase env:create envName')}

${chalk.gray('–')} 初始化云开发项目

  ${chalk.cyan('$ cloudbase init')}

${chalk.gray('–')} 部署云函数

  ${chalk.cyan('$ cloudbase functions:deploy')}

${chalk.gray('–')} 查看命令使用介绍

  ${chalk.cyan('$ cloudbase -h')}

Tips：可以使用简写命令 tcb 代替 cloudbase`
    console.log(tips)
}

// 登录
export async function accountLogin(options) {
    const loading = loadingFactory()
    loading.start('检验登录状态')
    const hasLogin = await checkAndGetCredential()
    if (hasLogin) {
        loading.succeed('您已登录，无需再次登录！')
        return
    } else {
        loading.stop()
    }

    // 兼容临时密钥和永久密钥登录
    if (options.key) {
        // 使用永久密钥登录
        const { secretId } = await inquirer.prompt({
            type: 'input',
            name: 'secretId',
            message: '请输入腾讯云 SecretID：'
        })

        const { secretKey } = await inquirer.prompt({
            type: 'input',
            name: 'secretKey',
            message: '请输入腾讯云 SecretKey：'
        })

        if (!secretId || !secretKey) {
            throw new CloudBaseError('SecretID 或 SecretKey 不能为空')
        }

        loading.start('正在验证腾讯云密钥...')

        const res = await login({
            key: true,
            secretId,
            secretKey
        })

        if (res.code === 'SUCCESS') {
            loading.succeed('登录成功！')
            printSuggestion()
        } else {
            loading.fail('腾讯云密钥验证失败，请检查密钥是否正确或终端网络是否可用！')
            return
        }
    } else {
        // 使用临时密钥登录-支持自动续期
        loading.start('获取授权中...')
        const res = await login()

        if (res.code === 'SUCCESS') {
            loading.succeed('登录成功！')
            printSuggestion()
        } else {
            loading.fail(res.msg)
            console.log('请检查你的网络，尝试重新运行 cloudbase login 命令！')
            return
        }
        return
    }

    // 检测用户是否存在，不存在则初始化
    try {
        const envs = await listEnvs()
        if (!envs.length) {
            warnLog('您还没有可用的环境，请使用 cloudbase env:create $name 创建环境')
        }
    } catch (e) {
        // 用户不存在
        if (e.code === 'ResourceNotFound.UserNotExists') {
            errorLog('您还没有初始化云开发服务！')
        } else {
            throw e
        }
    }
}
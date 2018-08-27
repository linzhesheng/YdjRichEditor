/*
 * <% Title %> Constants
 *
 * 每个action都有相应的type, 好让reducer知道如何处理
 * 避免在reducer和action之间使用了错别字， 我们都从这里获取相同的constants
 * 我们推荐加前缀比如 ‘yourproject/yourComponent’避免reducer搞错action，类似命名空间
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'pageName/containerName/YOUR_ACTION_CONSTANT';
 */

const PAGENAME = 'finanace/<% Title %>'

export const DEMO_TYPE = `${PAGENAME}/DEMO_TYPE`



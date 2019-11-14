

const validator = require('validator')
const {
	ParameterException
} = require('./http-exception')
const {
	get,
	last,
	set,
	cloneDeep
} = require("lodash")

class BaseValidator {
	isPass(rules) {
		let validateRes = rules.map((ruleMap) => {
			return {
				pass: ruleMap.rule(),
				msg: ruleMap.msg
			}
		})
		if (validateRes.every(res => res.pass === true)) {
			return {
				isPass: true
			}
		}
		const msgIndex = validateRes.findIndex(per => per.pass === false)
		return {
			isPass,
			msg: msgIndex >=0 ? validateRes[msgIndex].msg : null
		}
	}
}


module.exports = {
	BaseValidator
}
// !wok合并数组和type的方法！
export type Fields = typeof FieldsArray[number] | string[]
export const FieldsArray = ['数学', '高中数学', '数学分析', '线性代数', '离散数学', '概率与数理分析', '软件工程', '算法', '物理', '英语', '政治'] as const
// enum FieldsEnum { '数学', '高中数学', '数学分析', '线性代数', '离散数学', '概率与数理分析', '软件工程', '算法', '物理', '英语' }
export type PromptDetail = '详细' | '较详细' | '较简略' | '简略'
export type PromptNum = '最少' | '较少' | '一般多' | '较多' | '最多'
export type PromptDifficulty = '简单' | '常见' | '少见' | '专业'

export type PromptOrigin = {
	originText: string,
}
export type PromptConclusion = {
	field: Fields,
	detail: PromptDetail
}
export type PromptKey = {
	num: PromptNum
}
export type PromptExtra = {
	field: Fields,
	withExplaintion: boolean,
	difficulty: PromptDifficulty
}
export type PromptQues = {
	difficulty: PromptDifficulty,
}
export function prompt_origin({ originText }: PromptOrigin) {
	return `请你详细阅读以下课堂授课内容的内容，并回答我后续的问题：\n${originText}`
}
export function prompt_conclusion({ field, detail }: PromptConclusion) {
	return `你现在是一名${field && field[0] !== '' ? `在${field}方面` : ''}教学经验丰富的教师，请你${detail}地总结上述的课堂授课内容。`
}
export function prompt_key({ num }: PromptKey) {
	return `请你根据以上内容，用${num}的点${num === '最少' || num === '较少' || num === '一般多' ? '精简' : '详细'}地总结其中的重点和难点，分开描述。`
}
export function prompt_extra({ field, withExplaintion, difficulty }: PromptExtra) {
	return `请你根据以上内容，尝试${field && field[0] !== '' ? `往${field}的方向` : ''}拓展一些${field && field[0] !== '' ? '' : '和课程相关的'}${difficulty}知识，要求${withExplaintion ? '同时介绍这方面的知识' : '只罗列方向，不要做任何解释'}`
}
export function prompt_ques({ difficulty }: PromptQues) {
	return `请你根据以上内容向学生提出几个${difficulty}问题巩固学生的基础并给出答案，要求每个问题和答案都换一行输出。`
}
<template>
    <div>
        <div class="sky-top">
            <van-icon name="location-o" size="20" />{{ cityName }}
        </div>
        <div class="sky-condition">
            <div class="condition-item">
                <span class="temp">{{ cityTemp }}°</span>
                <span class="status">{{ cityCondition }}</span>
            </div>
            <div class="condition-item">
                <span class="spec"><i class="iconfont icon-feng-"></i> {{ cityWind }}级</span>
                <span class="spec"><i class="iconfont icon-IOTtubiao_huabanfuben"></i> {{ cityHumidity }}%</span>
                <span class="spec"><i class="iconfont icon-qiya"></i> {{ cityPressure }}hPa</span>
            </div>
            <div class="condition-item">
                <span class="spec">温馨提示: {{ tips }}</span>
            </div>
        </div>
        <div class="sky-prediction">
            <div class="prediction-item" v-for="(item, index) in forecastList.slice(1, 3)" :key="index">
                <div class="prediction-box">
                    <div class="prediction-left">
                        <p>{{ index === 0 ? '今天' : '明天' }}</p>
                        <p>{{ item.conditionDay }}</p>
                    </div>
                    <div class="prediction-right">
                        <p>{{ item.tempDay }}/{{ item.tempNight }}°</p>
                        <p>
                            <svg-icon :icon-class="item.conditionDay | handleIcon" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="sky-chart">
            <div class="label">未来一周预报</div>
            <div class="chart-wrap">
                <div class="chart-item" v-for="(forecastValue, index) in forecastList.slice(1, 8)" :key="index">
                    <p>{{ forecastValue.predictDate | handleWeek(index) }}</p>
                    <p>{{ forecastValue.predictDate | handleDay }}</p>
                    <p>{{ forecastValue.conditionDay }}</p>
                    <div>
                        <svg-icon :icon-class="forecastValue.conditionDay | handleIcon" />
                    </div>
                </div>
            </div>
        </div>
        <ve-line :data="chartData" :extend="extend" :legend-visible="false"></ve-line>
        <div class="sky-lifeindex">
            <div class="label">生活指数</div>
            <div class="lifeindex-wrap">
                <div class="lifeindex-item" v-for="(value, index) in lifeIndexList" :key="index">
                    <div class="lifeindex-box">
                        <div>
                            <svg-icon :icon-class="value.icon" />
                        </div>
                        <p class="li-status">{{ value.status }}</p>
                        <p class="li-name">{{ value.name.substring(0, value.name.length - 2) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from 'vant'
export default {
    name: 'index',
    components: {
        [Icon.name]: Icon
    },
    data() {
        this.extend = {
            series: {
                label: {
                    normal: {
                        show: true
                    }
                }
            }
        }
        return {
            chartData: {
                columns: ['日期', '最高温度', '最低温度'],
                rows: null
            },
            lifeIndexArr: ['穿衣指数', '钓鱼指数', '化妆指数', '洗车指数', '感冒指数', '运动指数', '紫外线指数'],
            lifeIndexIconArr: ['fuzhuang', 'Fishing', 'ziyuan', 'xiche', 'ganmaoyongyao', 'yundong', 'yangguang'],
            cityName: null,
            cityTemp: null, // 气温
            cityCondition: null, // 状态
            cityWind: null, // 风力
            cityHumidity: null, // 湿度
            cityPressure: null, // 气压
            tips: null,
            forecastList: [],
            lifeIndexList: [] // 生活指数
        }
    },
    created() {
        this.getCondition()
        this.getForecast()
        this.getLife()
    },
    filters: {
        handleWeek(date, index) {
            const dayArr = ['今天','明天','后天']
            const weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
            let myDate = date.replace(/-/g, '/')
            let getDay = new Date(myDate).getDay()
            return index < 2 ? dayArr[index] : weekArr[getDay]
        },
        handleDay(date) {
            return date.replace(/-/g, '/').substr(5)
        },
        handleIcon(value) {
            let weatherStr = '晴多云雨雪阴'
            let weatherIconArr = ['tianqi-qing', 'duoyun', 'tianqi-dayu', 'tianqi-daxue', 'tianqi-yintian']
            let weatherIndex = weatherStr.indexOf(value)
            switch(weatherIndex) 
            {
            case 0:
                return weatherIconArr[0]
            case 1:
                return weatherIconArr[1]
            case 3:
                return weatherIconArr[2]
            case 4:
                return weatherIconArr[3]
            case 5:
                return weatherIconArr[4]
            default:
                return weatherIconArr[4]
            }
        }
    },
    methods: {
        // 天气实况
        getCondition() {
            this.$api.weather.condition({
                id: 3
            }).then(res => {
                let resData = res.data.data
                let { city, condition } = resData
                this.cityName = city.name
                this.cityTemp = condition.temp
                this.cityCondition = condition.condition
                this.cityWind = condition.windLevel
                this.cityHumidity = condition.humidity
                this.cityPressure = condition.pressure
                this.tips = condition.tips
            })
        },
        // 天气预报15天
        getForecast() {
            this.$api.weather.forecast({
                id: 3
            }).then(res => {
                let resData = res.data.data.forecast
                this.forecastList = resData
                let forecastArr = this.forecastList.slice(1, 8)
                let chartArr = forecastArr.map(({predictDate, tempDay, tempNight}) => {
                    return {'日期': predictDate.substr(5).replace(/-/, '/'), '最高温度': tempDay, '最低温度': tempNight}
                })
                this.chartData.rows = chartArr
            })
        },
        // 生活指数
        getLife() {
            this.$api.weather.life({
                id: 3
            }).then(res => {
                let resData = res.data.data.liveIndex
                Object.keys(resData).forEach(key => {
                    let lifeIndexArr = this.filterName(resData[key], this.lifeIndexArr)
                    lifeIndexArr.forEach((item, index) => {
                        item.icon = this.lifeIndexIconArr[index]
                    })
                    this.lifeIndexList = lifeIndexArr
                })
            })
        },
        filterName(resArr, nameArr) {
            let arr = []
            for(let i = 0; i < nameArr.length; i++) {
                arr.push(resArr.find(item => item.name === nameArr[i]))
            }
            return arr
        }
    }
}
</script>

<style lang="stylus" scoped>
    .sky-top {
        display: flex;
        align-items: center;
        padding: toRem(20);
        background-color: $darkColor;
        color: $whiteColor;
        font-size: toRem(14);
    }
    .label {
        display: flex;
        font-size: toRem(16);
        padding: toRem(20);
    }
    .sky-condition {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        height: toRem(200);
        background-color: $darkColor;
        color: $whiteColor;
        .condition-item {
            display: flex;
            justify-content: flex-start;
            padding: 0 toRem(20) toRem(10);
            .temp {
                font-size: toRem(100);
                font-weight: 100;
                margin-right: toRem(10);
            }
            .status {
                font-size: toRem(24);
            }
            .spec {
                font-size: toRem(14);
                margin-right: toRem(10);
            }
        }
    }
    .sky-prediction {
        display: flex;
        background-color: $darkColor;
        .prediction-item {
            flex: 1;
            width: 50%; 
            .prediction-box {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0 toRem(20);
                .prediction-left, .prediction-right {
                    display: flex;
                    flex-wrap: wrap;
                    height: 100%;
                    color: $whiteColor;
                    font-size: toRem(14);
                    p {
                        width: 100%;
                    }
                }
                .prediction-left {
                    justify-content: flex-start;    
                }
                .prediction-right {
                    justify-content: flex-end;    
                }
            }
            &:first-child {
                border-right: 1px solid hsla(0, 0%, 100%, .1);
            }
        }    
    }
    .sky-chart {
        padding: toRem(20) 0;
        background-color: $darkColor;
        color: $whiteColor;
        .chart-wrap {
            display: flex;
            .chart-item {
                flex: 1;
                text-align: center;
                font-size: toRem(14)    
            }    
        }
    }
    .sky-lifeindex {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        background-color: $darkColor;
        color: $whiteColor;
        .lifeindex-wrap {
            display: flex;
            flex-wrap: wrap;
            .lifeindex-item {
                flex-center()
                width: 25%;
                .lifeindex-box {
                    padding: toRem(5) 0;
                    text-align: center;   
                    .li-name {
                        color: #ccc;
                        font-size: toRem(14)
                    }
                    .li-status {
                        font-size: toRem(16)
                    }
                }
            }
        }
    }
</style>
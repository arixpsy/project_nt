<template>
    <div class="weather">
        <div class="weather-display-data">
            <div class="location"><font-awesome-icon icon="location-arrow" /> {{location}}</div>
            <div class="country"><font-awesome-icon icon="globe-asia" /> {{country}}</div>
            <div class='err' v-if="err">{{err_msg}}</div>
            <div class="icon">{{icon}}</div>
            <div class="desc">{{desc}}</div>

            <div class="misc-data">
                <font-awesome-icon icon="cloud" /><div class="cloudiness">{{cloudiness}}</div>
                <font-awesome-icon icon="wind" /><div class="windspeed">{{windspeed}}</div>
                <div class="misc-tooltip">Cloudiness</div><div class="misc-tooltip">Windspeed</div>

                <font-awesome-icon icon="tint" /><div class="humidity">{{humidity}}</div>
                <font-awesome-icon icon="thermometer-half" /><div class="temp">{{temp}}</div>
                <div class="misc-tooltip">Humidity</div><div class="misc-tooltip">Temperature</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'weather',
    data(){
        return{
            cloudiness: '-',
            windspeed: '-',
            humidity: '-',
            temp: '-',
            location: 'Unknown',
            country: 'Unknown',
            desc: '',
            icon: '',
            ISO: {
                'AF' : 'Afghanistan',
                'AX' : 'Aland Islands',
                'AL' : 'Albania',
                'DZ' : 'Algeria',
                'AS' : 'American Samoa',
                'AD' : 'Andorra',
                'AO' : 'Angola',
                'AI' : 'Anguilla',
                'AQ' : 'Antarctica',
                'AG' : 'Antigua And Barbuda',
                'AR' : 'Argentina',
                'AM' : 'Armenia',
                'AW' : 'Aruba',
                'AU' : 'Australia',
                'AT' : 'Austria',
                'AZ' : 'Azerbaijan',
                'BS' : 'Bahamas',
                'BH' : 'Bahrain',
                'BD' : 'Bangladesh',
                'BB' : 'Barbados',
                'BY' : 'Belarus',
                'BE' : 'Belgium',
                'BZ' : 'Belize',
                'BJ' : 'Benin',
                'BM' : 'Bermuda',
                'BT' : 'Bhutan',
                'BO' : 'Bolivia',
                'BA' : 'Bosnia And Herzegovina',
                'BW' : 'Botswana',
                'BV' : 'Bouvet Island',
                'BR' : 'Brazil',
                'IO' : 'British Indian Ocean Territory',
                'BN' : 'Brunei Darussalam',
                'BG' : 'Bulgaria',
                'BF' : 'Burkina Faso',
                'BI' : 'Burundi',
                'KH' : 'Cambodia',
                'CM' : 'Cameroon',
                'CA' : 'Canada',
                'CV' : 'Cape Verde',
                'KY' : 'Cayman Islands',
                'CF' : 'Central African Republic',
                'TD' : 'Chad',
                'CL' : 'Chile',
                'CN' : 'China',
                'CX' : 'Christmas Island',
                'CC' : 'Cocos (Keeling) Islands',
                'CO' : 'Colombia',
                'KM' : 'Comoros',
                'CG' : 'Congo',
                'CD' : 'Congo, Democratic Republic',
                'CK' : 'Cook Islands',
                'CR' : 'Costa Rica',
                'CI' : 'Cote D\'Ivoire',
                'HR' : 'Croatia',
                'CU' : 'Cuba',
                'CY' : 'Cyprus',
                'CZ' : 'Czech Republic',
                'DK' : 'Denmark',
                'DJ' : 'Djibouti',
                'DM' : 'Dominica',
                'DO' : 'Dominican Republic',
                'EC' : 'Ecuador',
                'EG' : 'Egypt',
                'SV' : 'El Salvador',
                'GQ' : 'Equatorial Guinea',
                'ER' : 'Eritrea',
                'EE' : 'Estonia',
                'ET' : 'Ethiopia',
                'FK' : 'Falkland Islands (Malvinas)',
                'FO' : 'Faroe Islands',
                'FJ' : 'Fiji',
                'FI' : 'Finland',
                'FR' : 'France',
                'GF' : 'French Guiana',
                'PF' : 'French Polynesia',
                'TF' : 'French Southern Territories',
                'GA' : 'Gabon',
                'GM' : 'Gambia',
                'GE' : 'Georgia',
                'DE' : 'Germany',
                'GH' : 'Ghana',
                'GI' : 'Gibraltar',
                'GR' : 'Greece',
                'GL' : 'Greenland',
                'GD' : 'Grenada',
                'GP' : 'Guadeloupe',
                'GU' : 'Guam',
                'GT' : 'Guatemala',
                'GG' : 'Guernsey',
                'GN' : 'Guinea',
                'GW' : 'Guinea-Bissau',
                'GY' : 'Guyana',
                'HT' : 'Haiti',
                'HM' : 'Heard Island & Mcdonald Islands',
                'VA' : 'Holy See (Vatican City State)',
                'HN' : 'Honduras',
                'HK' : 'Hong Kong',
                'HU' : 'Hungary',
                'IS' : 'Iceland',
                'IN' : 'India',
                'ID' : 'Indonesia',
                'IR' : 'Iran, Islamic Republic Of',
                'IQ' : 'Iraq',
                'IE' : 'Ireland',
                'IM' : 'Isle Of Man',
                'IL' : 'Israel',
                'IT' : 'Italy',
                'JM' : 'Jamaica',
                'JP' : 'Japan',
                'JE' : 'Jersey',
                'JO' : 'Jordan',
                'KZ' : 'Kazakhstan',
                'KE' : 'Kenya',
                'KI' : 'Kiribati',
                'KR' : 'Korea',
                'KW' : 'Kuwait',
                'KG' : 'Kyrgyzstan',
                'LA' : 'Lao People\'s Democratic Republic',
                'LV' : 'Latvia',
                'LB' : 'Lebanon',
                'LS' : 'Lesotho',
                'LR' : 'Liberia',
                'LY' : 'Libyan Arab Jamahiriya',
                'LI' : 'Liechtenstein',
                'LT' : 'Lithuania',
                'LU' : 'Luxembourg',
                'MO' : 'Macao',
                'MK' : 'Macedonia',
                'MG' : 'Madagascar',
                'MW' : 'Malawi',
                'MY' : 'Malaysia',
                'MV' : 'Maldives',
                'ML' : 'Mali',
                'MT' : 'Malta',
                'MH' : 'Marshall Islands',
                'MQ' : 'Martinique',
                'MR' : 'Mauritania',
                'MU' : 'Mauritius',
                'YT' : 'Mayotte',
                'MX' : 'Mexico',
                'FM' : 'Micronesia, Federated States Of',
                'MD' : 'Moldova',
                'MC' : 'Monaco',
                'MN' : 'Mongolia',
                'ME' : 'Montenegro',
                'MS' : 'Montserrat',
                'MA' : 'Morocco',
                'MZ' : 'Mozambique',
                'MM' : 'Myanmar',
                'NA' : 'Namibia',
                'NR' : 'Nauru',
                'NP' : 'Nepal',
                'NL' : 'Netherlands',
                'AN' : 'Netherlands Antilles',
                'NC' : 'New Caledonia',
                'NZ' : 'New Zealand',
                'NI' : 'Nicaragua',
                'NE' : 'Niger',
                'NG' : 'Nigeria',
                'NU' : 'Niue',
                'NF' : 'Norfolk Island',
                'MP' : 'Northern Mariana Islands',
                'NO' : 'Norway',
                'OM' : 'Oman',
                'PK' : 'Pakistan',
                'PW' : 'Palau',
                'PS' : 'Palestinian Territory, Occupied',
                'PA' : 'Panama',
                'PG' : 'Papua New Guinea',
                'PY' : 'Paraguay',
                'PE' : 'Peru',
                'PH' : 'Philippines',
                'PN' : 'Pitcairn',
                'PL' : 'Poland',
                'PT' : 'Portugal',
                'PR' : 'Puerto Rico',
                'QA' : 'Qatar',
                'RE' : 'Reunion',
                'RO' : 'Romania',
                'RU' : 'Russian Federation',
                'RW' : 'Rwanda',
                'BL' : 'Saint Barthelemy',
                'SH' : 'Saint Helena',
                'KN' : 'Saint Kitts And Nevis',
                'LC' : 'Saint Lucia',
                'MF' : 'Saint Martin',
                'PM' : 'Saint Pierre And Miquelon',
                'VC' : 'Saint Vincent And Grenadines',
                'WS' : 'Samoa',
                'SM' : 'San Marino',
                'ST' : 'Sao Tome And Principe',
                'SA' : 'Saudi Arabia',
                'SN' : 'Senegal',
                'RS' : 'Serbia',
                'SC' : 'Seychelles',
                'SL' : 'Sierra Leone',
                'SG' : 'Singapore',
                'SK' : 'Slovakia',
                'SI' : 'Slovenia',
                'SB' : 'Solomon Islands',
                'SO' : 'Somalia',
                'ZA' : 'South Africa',
                'GS' : 'South Georgia And Sandwich Isl.',
                'ES' : 'Spain',
                'LK' : 'Sri Lanka',
                'SD' : 'Sudan',
                'SR' : 'Suriname',
                'SJ' : 'Svalbard And Jan Mayen',
                'SZ' : 'Swaziland',
                'SE' : 'Sweden',
                'CH' : 'Switzerland',
                'SY' : 'Syrian Arab Republic',
                'TW' : 'Taiwan',
                'TJ' : 'Tajikistan',
                'TZ' : 'Tanzania',
                'TH' : 'Thailand',
                'TL' : 'Timor-Leste',
                'TG' : 'Togo',
                'TK' : 'Tokelau',
                'TO' : 'Tonga',
                'TT' : 'Trinidad And Tobago',
                'TN' : 'Tunisia',
                'TR' : 'Turkey',
                'TM' : 'Turkmenistan',
                'TC' : 'Turks And Caicos Islands',
                'TV' : 'Tuvalu',
                'UG' : 'Uganda',
                'UA' : 'Ukraine',
                'AE' : 'United Arab Emirates',
                'GB' : 'United Kingdom',
                'US' : 'United States',
                'UM' : 'United States Outlying Islands',
                'UY' : 'Uruguay',
                'UZ' : 'Uzbekistan',
                'VU' : 'Vanuatu',
                'VE' : 'Venezuela',
                'VN' : 'Viet Nam',
                'VG' : 'Virgin Islands, British',
                'VI' : 'Virgin Islands, U.S.',
                'WF' : 'Wallis And Futuna',
                'EH' : 'Western Sahara',
                'YE' : 'Yemen',
                'ZM' : 'Zambia',
                'ZW' : 'Zimbabwe'
            },
            Icon: {
                '01d':'☀',
                '01n':'🌑',
                '02d':'☁',
                '02n':'☁',
                '03d':'☁',
                '03n':'☁',
                '04d':'☁',
                '04n':'☁',
                '09d':'🌧',
                '09n':'🌧',
                '10d':'🌧',
                '10n':'🌧',
                '11d':'⛈',
                '11n':'⛈',
                '13d':'🌨',
                '13n':'🌨',
                '50d':'🌫',
                '50n':'🌫',
            },
            err: false,
            err_msg: ''
        }
    },
    methods: {
        updateWeather: function(){
            let api = "https://api.openweathermap.org/data/2.5/weather?units=metric";
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((pos)=>{
                    api += "&lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude;
                    fetch(api+"&appid=996b279a896d2dae4dedc2050576fcd3").then(response => {
                        return response.json();
                    })
                    .catch( err =>{ 
                        alert(err);
                        this.err = true;
                        this.err_msg = "Geolocation Failed!";
                    }).then(data => {
                        this.cloudiness = data.clouds.all;
                        this.windspeed = data.wind.speed;
                        this.humidity = data.main.humidity;
                        this.temp = Math.round(data.main.temp) + String.fromCharCode(176);
                        this.location = data.name;
                        this.country = this.ISO2Country(data.sys.country);
                        this.desc = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);
                        this.icon = this.Icon2Emoji(data.weather[0].icon);
                    })
                },()=>{
                    this.err = true;
                    this.err_msg = "Geolocation Unavailable!";
                })
            }
        },
        ISO2Country: function(code){
            return this.ISO[code];
        },
        Icon2Emoji: function(code){
            return this.Icon[code];
        }
    },
    created(){
        this.updateWeather();
        setInterval(() => {
            this.updateWeather();
        }, 1000 * 3600);
    }
}
</script>
<style scoped>
.weather{
    position: relative;
    grid-column: span 1;  
    grid-row: span 1;
    background-image: linear-gradient(to top right, #225BE5, #4473E9);
    display: flex;
    align-items: center;
    padding: 15px;
} 
.weather-display-data{
    display: flex;
    flex-direction: column;
    font-family: monospace;
    color: white;
    font-size: 2rem;
    margin: auto;
    text-align: center;
}
.weather-display-data > div > span{
    text-align: center;
}
.icon{
    font-size: 8rem;
}
.country , .desc{
    font-size:0.8rem;
}
.misc-data{
    margin-top: 20px;
    display: grid;
    grid-template-columns: auto 1fr auto 1fr;
    grid-gap: 5px;
    justify-items: center;
}
.misc-tooltip{
    grid-column: span 2;
    font-size: 10px;
    height: 0px;
    overflow: hidden;
    transition: height 0.2s ease-out;
}
.misc-data:hover .misc-tooltip{
    height: 10px;
}
.err{
    margin: 30px 0;
}
</style>


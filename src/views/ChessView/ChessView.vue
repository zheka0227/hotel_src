<template>
  <NavBarComponent></NavBarComponent>
  <div id="main">
    <div id="tools">
      <div id="filter">
        <div>
          <span>{{ this.dictionary.chess_korpus }}</span>
          <select id="type_korpusa" v-model="type_korpusa" @change="changeKorpus()">
            <option value="ol1">{{ this.dictionary.ol1 }}</option>
            <option value="ol2">{{ this.dictionary.ol2 }}</option>
            <option value="sk">{{ this.dictionary.sk }}</option>
          </select>
        </div>
        <div id="startEnd">
          <div>
            <span>{{ this.dictionary.chess_showFrom }}</span>
            <input type="date" v-model="startDate" @change="calcDates()"/>
          </div>
          <div v-show="this.startDate">
            <span>{{ this.dictionary.chess_to }}</span>
            <input type="date" v-model="endDate" @change="calcDates()"/>
          </div>
        </div>
        <button ref="markTd" @click="markTd()" id="markTd" :style="markTdStyle">{{ markText }}</button>
      </div>

      <div id="legend"> 
        <table v-bind:style="{width:td_width*10+'px', height:td_height+'px', 'border-spacing': '0px 0px'}">
          <tbody>
            <tr>
              <td>
                <div id="cell1" class="bron cell">{{ this.dictionary.chess_zay }}</div>
              </td><td></td><td></td><td></td><td></td>
              <td>
                <div id="cell2" class="zaselen cell">{{ this.dictionary.chess_zas }}</div>
              </td><td></td><td></td><td></td><td></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div id="tables_all" v-bind:style="{width:tableWidth+'px'}">
      <div id="table_numbers" ref="table_numbers">
        <table>
          <thead>
            <tr>
              <th :style="{width:table_numbers_width+'px'}">{{ this.dictionary.chess_numbers }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(number, index1) in this.numbers" v-bind:key="index1">
              <td v-bind:style="{height:td_height+'px'}">{{number}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="table_dates">
        <table>
          <thead>
            <tr>
              <th v-for="(date, index1) in this.dates" v-bind:key="index1" v-bind:style="{width:td_width+'px'}"><div v-bind:style="{fontSize:'14px'}">{{ toNormDate(date) }}</div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(number, index1) in this.numbers" v-bind:key="index1">
              <td v-for="(date, index2) in this.dates" v-bind:key="index2" @click="clickTd(number, date)" v-bind:style="{height:td_height+'px', 'background-color':colorTd(number, date)}">
                <div v-for="(params, index3) in common[[number, new Date(date).setHours(0, 0, 0, 0)]]" v-bind:key="index3">
                  <CellComponent v-bind:style="{'z-index':zindexCell}" v-if="params" v-bind:params="params" v-bind:table_numbers_coord="{width:table_numbers_width}">
                  </CellComponent>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style src="./ChessView.scss" lang="scss" scoped></style>
<script src="./ChessView.js"></script>
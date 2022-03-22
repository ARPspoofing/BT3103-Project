<template>
  <li class="event">
    <h3>{{title}}</h3>
    <p>{{description}}</p>
  </li>
</template>

<script>
export default {
    props:{
        title: String, 
        description: String,
    }
}
</script>

<style>
p {
      font-size: 14px;
  }

  .event {
      border-bottom: 1px dashed #e8ebf1;
      padding-bottom: 25px;
      margin-bottom: 25px;
      position: relative;
  }
 h3 {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      text-align: left;
  }

/*
    .timeline {
    border-left: 3px solid #004A23;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    background: #DBEBE3;
    margin: 40px;
    letter-spacing: 0.2px;
    position: relative;
    line-height: 1.4em;
    font-size: 1.03em;
    padding: 50px 35px 50px 50px;
    list-style: none;
    text-align: left;
    max-width: 65%;
  }

  .h1 {
      font-weight: 300;
      font-size: 1.4em;
  }
  p {
      font-size: 14px;
  }

  .event {
      border-bottom: 1px dashed #e8ebf1;
      padding-bottom: 25px;
      margin-bottom: 25px;
      position: relative;
  }

  .event:last-of-type {
      padding-bottom: 0;
      margin-bottom: 0;
      border: none;
  }

  .event:before,
  .event:after {
      position: absolute;
      display: block;
      top: 0;
  }

  .timeline .event:before {
      left: -207px;
      content: attr(data-date);
      text-align: right;
      font-weight: 100;
      font-size: 0.9em;
      min-width: 120px;
  }

  .event:after {
      -webkit-box-shadow: 0 0 0 3px #004A23;
      box-shadow: 0 0 0 3px #004A23;
      left: -55.8px;
      background: #fff;
      border-radius: 50%;
      height: 9px;
      width: 9px;
      content: "";
      top: 5px;
  }*/
</style>
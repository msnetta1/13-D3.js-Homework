// @TODO: YOUR CODE HERE!
   

var svgWidth = 1200;

var svgHeight = 660;



var margin = {

  top: 150,

  right: 150,

  bottom: 150,

  left: 150

};



var height = svgHeight - margin.top - margin.bottom;

var width = svgWidth - margin.left - margin.right;



var svg = d3.select('#scatter')

  .append('svg')

  .attr('width', svgWidth)

  .attr('height', svgHeight);



var chartGroup = svg.append('g')

  .attr('transform', `translate(${margin.left}, ${margin.top})`);





d3.csv('assets/data/data.csv').then(function(hData) {



    // Step 1: Parse Data/Cast as numbers

  // ==============================

  hData.forEach(function(d) {

    d.poverty = +d.poverty;

    d.healthcare = +d.healthcare;

  });



  // Step 2: Create scale functions

  // ==============================

  var xLinearScale = d3.scaleLinear()

    .domain([d3.min(hData, d => d.poverty) - 1,

             d3.max(hData, d => d.poverty) + 1])

    .range([0, width])

    .nice();



  var yLinearScale = d3.scaleLinear()

    .domain([d3.min(hData, d => d.healthcare) - 2,

             d3.max(hData, d => d.healthcare) + 2])

    .nice()

    .range([height, 0]);



  // Step 3: Create axis functions

  // ==============================

  var bottomAxis = d3.axisBottom(xLinearScale);

  var leftAxis = d3.axisLeft(yLinearScale);



  // Step 4: Append Axes to the chart

  // ==============================

  chartGroup.append('g')

    .attr('transform', `translate(0, ${height})`)

    .call(bottomAxis);



  chartGroup.append('g')

    .call(leftAxis);





  // Step 5: Create Circles

  // ==============================



  var circlesGroup = chartGroup.selectAll('circle')

  .data(hData);



  var elemEnter = circlesGroup.enter()

    .append("g")

    .attr("transform", function(d){

      return "translate("+xLinearScale(d.poverty)+","+yLinearScale(d.healthcare)+")"});



  /*Create the circle for each block */

  elemEnter.append("circle")

    .attr("r", '16')

    .attr("stroke", 'lightblue')

    .attr('opacity', '.99')

    .attr("fill", 'lightblue');



  /* Create the text for each block */

  elemEnter.append("text")

    .text(function(d){return d.abbr})

    .attr("dx", '0')

    .attr("dy", '5')

    .attr("font-size", '13')

    .attr("text-anchor", "middle")

    .style('fill', 'white')

    .style("font-weight", "bold");



  // text label for the x axis

  svg.append("text")

      .attr("transform",

            "translate(" + ( margin.left + (width/2))  + " ," +

                           (height + margin.top + 50) + ")")

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("In Poverty (%)");



  // text label for the y axis

  svg.append("text")

      .attr("transform",

          `translate(${(margin.left - 50)}, ${(height/2) + margin.top}) rotate(-90)`)

      .style("text-anchor", "middle")

      .style("font-weight", "bold")

      .text("Lacks Healthcare (%)");





  // Step 6: Initialize tool tip

  // ==============================

  var toolTip = d3.tip()

    .attr('class', 'd3-tip')

    .offset([-10, -50])

    .html(function(d) {

      return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);

    });



  // Step 7: Create tooltip in the chart

  // ==============================

  chartGroup.call(toolTip);



  elemEnter

  .on('mouseover', toolTip.show)

  .on('mouseout', toolTip.hide);





});

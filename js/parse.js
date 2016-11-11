"use strict";
jQuery(document).ready(function($)
{
	var table_head;
if (window.screen.width <= 400) {
		  
		  table_head="<table class='table' id='grid'><tr><th data-type='number'>&nbsp</th><th data-type='string' class='bigtd thed'>Команда</th><th data-type='number'><span title='Нажмите на заголовок, чтобы отсортировать колонку'>М</span></td><th data-type='number' class='score'><span id='score'>О</span></th></tr></table>";
        
}
else{
	 table_head="<table class='table' id='grid'><tr><th data-type='number'>&nbsp</th><th data-type='string' class='bigtd thed'>Команда</th><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>М</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>В</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>Н</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>П</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>Заб</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>Проп</span></td><th data-type='number' class='score'><span id='score'>О</span></th></tr></table>";
	
            
}
$( "body" ).append(table_head);
    $.getJSON("seriea.json", function(data) {
        $.each(data["teams"], function() {
           // data["teams"][0].name
            //alert(this.name);
           // $( ".table" ).append( "<tr>");
		   
		   var color;
		   var t;
		   
		   if(this.color=="")
			   color="<td>";
		   else
			   if(this.color=="1")
				   color="<td class='color1'>";
			   else
				   if(this.color=="2")
				   color="<td class='color2'>";
			   else
				   if(this.color=="4")
				   color="<td class='color4'>";
		   if(this.flag_country=="Италия")
		   var flag_and_country = "<i class='flag-s flag-1306' title='Италия' alt='Италия'></i><a href='"+this.tag_url+"'>"+this.name+"</a></td><td>"
	   if (window.screen.width <= 400) {
		  
		  
        
        
		
      
       t = "<tr>"+color+this.place+"</td><td class='bigtd'>"+
                flag_and_country+
                this.matches+"</td><td>"+          
                this.score+"</td></tr>";
}
else{
	// table_head="<table class='table' id='grid'><tr><th data-type='number'>&nbsp</th><th data-type='string' class='bigtd thed'>Команда</th><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>М</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>В</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>Н</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>П</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>Заб</span></td><th data-type='number'><span   title='Нажмите на заголовок, чтобы отсортировать колонку'>Проп</span></td><th data-type='number' class='score'><span id='score'>О</span></th></tr></table>";
	
             t = "<tr>"+color+this.place+"</td><td class='bigtd'>"+
                flag_and_country+
                this.matches+"</td><td>"+
                this.win+"</td><td>"+
                this.draw+"</td><td>"+
                this.lose+"</td><td>"+
                this.goals+"</td><td>"+
                this.conceded_goals+"</td><td class='score'>"+
                this.score+"</td></tr>";
}
           
		$( ".table" ).append(t);             
        });
		
    });  
	
	var footer="<div class='description'><b>М</b>&nbsp;–&nbsp;матчи,<b>В</b>&nbsp;–&nbsp;выигрыши,<b>Н</b>&nbsp;–&nbsp;ничьи,<b>П</b>&nbsp;–&nbsp;поражения,<b>Заб</b>&nbsp;–&nbsp;забитые голы,<b>Проп</b>&nbsp;–&nbsp;пропущенные голы,<b>О</b>&nbsp;–&nbsp;очки в турнире</div>";
	$( "body" ).append(footer);
	$('th').click(function() {
	//if (this.tagName != 'TH') return;

      // Если TH -- сортируем
      sortGrid($(this)[0].cellIndex, $(this).attr("data-type"));
	 });
	
	
	
	
	
	
	

});
// сортировка таблицы
    // использовать делегирование!
    // должно быть масштабируемо:
    // код работает без изменений при добавлении новых столбцов и строк

  

    function sortGrid(colNum, type) {
      var tbody = grid.getElementsByTagName('tbody')[0];

      // Составить массив из TR
      var rowsArray = [].slice.call(tbody.rows);

      // определить функцию сравнения, в зависимости от типа
      var compare;

      switch (type) {
        case 'number':
          compare = function(rowA, rowB) {
            return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
          };
          break;
        case 'string':
          compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
          };
          break;
      }

      // сортировать
      rowsArray.sort(compare);

      // Убрать tbody из большого DOM документа для лучшей производительности
      grid.removeChild(tbody);

      // добавить результат в нужном порядке в TBODY
      // они автоматически будут убраны со старых мест и вставлены в правильном порядке
	  if(type=="string")
		  for (var i = 0; i < rowsArray.length-1; i++) {
        tbody.appendChild(rowsArray[i]);
      }	  
		else  
      for (var i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
      }

      grid.appendChild(tbody);

    }
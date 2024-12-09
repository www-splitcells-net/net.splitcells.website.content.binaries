function rowPopuper(e, row, onRendered) {
    // TODO Make the data selection configurable.
    return row.getData().reasoning.replaceAll("\\n", "<br />");
    }
function defaultColumnFormatter (cell, formatterParams, onRendered){
    if (cell.getValue() == undefined) {
        return undefined;
    }
    return cell.getValue();
    };
$(".net-splitcells-website-visually-replaceable").each((index, table) => {
    let config = {rowClickPopup:rowPopuper};
    let columns = [];
    config.columns = columns;
    let ths = table.querySelector('tbody').querySelector('tr').querySelectorAll('th');
    for (i = 0; i < ths.length; i++) {
        columns.push({title: "" + ths[i].innerHTML, formatter:defaultColumnFormatter});
    }
    let visualization = new Tabulator(table, config);
    });
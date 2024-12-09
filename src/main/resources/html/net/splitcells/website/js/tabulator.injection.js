function defaultColumnFormatter (cell, formatterParams, onRendered){
    if (cell.getValue() == undefined) {
        return undefined;
    }
    return cell.getValue();
    };
$(".net-splitcells-website-visually-replaceable").each((index, table) => {
    let config = {};
    let columns = [];
    config.columns = columns;
    let ths = table.querySelector('tbody').querySelector('tr').querySelectorAll('th');
    var popColumn = undefined;
    for (i = 0; i < ths.length; i++) {
        if (hasClass(ths[i], 'net-splitcells-website-table-popup-via-column-content')) {
            popColumn = ths[i].innerHTML;
        }
        columns.push({title: "" + ths[i].innerHTML, formatter:defaultColumnFormatter});
    }
    if (popColumn != undefined) {
        config.rowClickPopup = function (e, row, onRendered) {
            // TODO Make the data selection configurable.
            return row.getData()[popColumn].replaceAll("\\n", "<br />");
            }
        }
    let visualization = new Tabulator(table, config);
    });
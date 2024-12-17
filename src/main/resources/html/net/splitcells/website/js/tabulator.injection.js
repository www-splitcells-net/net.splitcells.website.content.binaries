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
            /* The column containing the pop up info is not shown,
             * as it may contain info that is higher than 1 line and therefore higher than a normal table row.
             * As Tabulator does not seem to support scrollable cell content,
             * the pop up column could massively waist visual GUI space.
             */
            continue;
        }
        columns.push({title: "" + ths[i].innerHTML
            ,formatter:defaultColumnFormatter
            ,maxInitialWidth: 300 // This is primarily set so, that the reasoning columns does not get too large.
            });
    }
    if (popColumn != undefined) {
        config.rowClickPopup = function (e, row, onRendered) {
            // TODO Make the data selection configurable.
            return row.getData()[popColumn].replaceAll("\\n", "<br />");
            }
        }
    let visualization = new Tabulator(table, config);
    });
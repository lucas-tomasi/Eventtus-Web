function tdbmultisearch_start( id, minlen, maxsize, placeholder, multiple, service, width, height, load_data, hash, callback ) {
    $('#'+id).select2(
    {
        minimumInputLength: minlen,
        maximumSelectionSize: maxsize,
        separator: '||',
        allowClear: true,
        placeholder: placeholder,
        multiple: multiple,
        id: function(e) { return e.id+"::"+e.text; },
        ajax: {
            url: service,
            dataType: 'json',
            quietMillis: 100,
            data: function(value, page) {
                return {
                    value: value,
                    hash: hash
                };
            },
            results: function(data, page ) 
            {
                var aa = [];
                $(data.result).each(function(i) {
                    var item = this.split('::');
                    aa.push({
                        id: item[0],
                        text: item[1]
                    });
                });               

                return {                             
                    results: aa 
                }
            }
        },             
                      
    });
    
    if (typeof callback != 'undefined')
    {
        $('#'+id).on("change", function (e) {
            callback();
        });
    }
    
    $('#s2id_'+id+ '> .select2-choices').height(height).width(width).css('overflow-y','auto');
    if (typeof load_data !== "undefined") {
        $('#'+id).select2("data", load_data);
    }
}
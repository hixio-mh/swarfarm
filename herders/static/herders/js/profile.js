$(document).ready(function() {
    update_monster_inventory();
});

function update_monster_inventory() {
    $('#FilterInventoryForm').submit();
}

function AddMonster() {
    $.ajax({
        url: '/profile/' + PROFILE_NAME + '/monster/add/',
        type: 'get'
    }).done( function(result) {
        bootbox.dialog({
            title: "Add Monster",
            message: result.html
        });
        $('.rating').rating();
    })
}

function EditMonster(instance_id) {
    $.ajax({
        type: 'get',
        url: '/profile/' + PROFILE_NAME + '/monster/edit/' + instance_id + '/'
    }).done(function(result) {
        bootbox.dialog({
            title: 'Edit Monster',
            message: result.html
        });
        $('.rating').rating();
    });
}

function CopyMonster(instance_id) {
    $.get('/profile/' + PROFILE_NAME + '/monster/copy/' + instance_id + '/', function() {
        update_monster_inventory();
    });
}

function AwakenMonster(instance_id) {
    if (instance_id) {
        $.ajax({
            type: 'get',
            url: '/profile/' + PROFILE_NAME + '/monster/awaken/' + instance_id + '/'
        }).done(function(result) {
            bootbox.dialog({
                title: 'Awaken Monster',
                message: result.html
            });
            $('.rating').rating();
        });
    }
}

function DeleteMonster(instance_id) {
    if (instance_id) {
        bootbox.confirm({
            size: 'small',
            message: 'Are you sure?',
            callback: function (result) {
                if (result) {
                    $.ajax({
                        type: 'get',
                        url: '/profile/' + PROFILE_NAME + '/monster/delete/' + instance_id + '/',
                        data: {
                            "delete": "delete",
                            "instance_id": instance_id
                        }
                    }).done(function () {
                        update_monster_inventory();
                    }).fail(function () {
                        alert("Something went wrong! Server admin has been notified.");
                    });
                }
            }
        });
    }
    else {
        alert("Unspecified monster to delete");
    }
}

function QuickFodder(btn) {
    var monster_id = btn.data('monster-id');
    var stars = btn.data('stars');
    var level = btn.data('level');

    $.ajax({
        type: 'get',
        url: '/profile/' + PROFILE_NAME + '/monster/quick_add/' + monster_id.toString() + '/' + stars.toString() + '/' + level.toString() + '/'
    }).done(function() {
        update_monster_inventory();
    });
}

$('body')
    .on('click', ':submit', function() {
        var $form = $(this).closest('form');
        $('<input>').attr({
            type: 'hidden',
            id: 'id' + $(this).attr('name'),
            name: $(this).attr('name'),
            value: $(this).attr('value')
        }).appendTo($form);
    })
    .on('submit', '.ajax-form', function() {
        //Handle add ajax form submit
        var $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function(data) {
            if (data.code === 'success') {
                $('.modal.in').modal('hide');
                update_monster_inventory();
            }
            else {
                $form.replaceWith(data.html);
                $('.rating').rating();
            }
        });

        return false;  //cancel default on submit action.
    })
    .on('click', '.monster-add', function() { AddMonster() })
    .on('click', '.monster-edit', function() { EditMonster($(this).data('instance-id')) })
    .on('click', '.monster-copy', function() { CopyMonster($(this).data('instance-id')) })
    .on('click', '.monster-delete', function() { DeleteMonster($(this).data('instance-id')) })
    .on('click', '.monster-awaken', function() { AwakenMonster($(this).data('instance-id')) })
    .on('click', '.quick-fodder', function() { QuickFodder($(this)) })
    .on('click', '.profile-view-mode', function() {
        var view_mode = $(this).data('mode');
        $.get('/profile/' + PROFILE_NAME + '/monster/inventory/' + view_mode + '/', function() {
            update_monster_inventory();
        });
    })
    .on('click', '.box-group-mode', function() {
        var group_mode = $(this).data('mode');
        $.get('/profile/' + PROFILE_NAME + '/monster/inventory/box/' + group_mode + '/', function() {
            update_monster_inventory();
        });
    })
    .on('submit', '#FilterInventoryForm', function() {
        ToggleLoading($('body'), true);

        var $form = $(this);

        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function (data) {
            ToggleLoading($('body'), false);
            $('#monster-inventory').replaceWith(data);

            //Reinit everything
            $('[data-toggle="tooltip"]').tooltip({
                container: 'body'
            });
            $('[data-toggle="popover"]').popover({
                html:true,
                viewport: {selector: 'body', padding: 2}
            });

            $('#monster_table').tablesorter({
                widgets: ['saveSort', 'columnSelector', 'stickyHeaders'],
                widgetOptions: {
                    filter_reset: '.reset',
                    columnSelector_container : '#column-selectors',
                    columnSelector_saveColumns: true,
                    columnSelector_mediaquery: false,
                    columnSelector_layout: '<label class="checkbox-inline"><input type="checkbox">{name}</label>',
                    stickyHeaders_zIndex : 2,
                    stickyHeaders_offset: 100
                }
            });
        });

        return false;  //cancel default on submit action.
    })
    .on('click', '.reset', function() {
        $('#monster_table').trigger('sortReset');
        var form = $('#FilterInventoryForm');
        form[0].reset();
        form.find('label').toggleClass('active', false);
        update_monster_inventory();
    });

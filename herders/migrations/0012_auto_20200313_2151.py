# Generated by Django 2.2.11 on 2020-03-14 04:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('herders', '0011_runecraftinstance_quantity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='monsterinstance',
            name='avg_rune_efficiency',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='base_accuracy',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='base_attack',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='base_crit_damage',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='base_crit_rate',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='base_defense',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='base_hp',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='base_resistance',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='base_speed',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='rune_accuracy',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='rune_attack',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='rune_crit_damage',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='rune_crit_rate',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='rune_defense',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='rune_hp',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='rune_resistance',
        ),
        migrations.RemoveField(
            model_name='monsterinstance',
            name='rune_speed',
        ),
        migrations.AlterField(
            model_name='monsterinstance',
            name='stars',
            field=models.IntegerField(choices=[(1, '1⭐'), (2, '2⭐'), (3, '3⭐'), (4, '4⭐'), (5, '5⭐'), (6, '6⭐')]),
        ),
        migrations.CreateModel(
            name='RuneBuild',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=200)),
                ('avg_efficiency', models.FloatField(default=0)),
                ('hp', models.IntegerField(default=0)),
                ('hp_pct', models.IntegerField(default=0)),
                ('attack', models.IntegerField(default=0)),
                ('attack_pct', models.IntegerField(default=0)),
                ('defense', models.IntegerField(default=0)),
                ('defense_pct', models.IntegerField(default=0)),
                ('speed', models.IntegerField(default=0)),
                ('crit_rate', models.IntegerField(default=0)),
                ('crit_damage', models.IntegerField(default=0)),
                ('resistance', models.IntegerField(default=0)),
                ('accuracy', models.IntegerField(default=0)),
                ('monster', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='herders.MonsterInstance')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='herders.Summoner')),
                ('runes', models.ManyToManyField(to='herders.RuneInstance')),
            ],
        ),
        migrations.AddField(
            model_name='monsterinstance',
            name='default_build',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='default_build', to='herders.RuneBuild'),
        ),
        migrations.AddField(
            model_name='monsterinstance',
            name='rta_build',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rta_build', to='herders.RuneBuild'),
        ),
    ]

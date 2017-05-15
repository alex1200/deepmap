#!/bin/sh
# kml-split.sh
# by Wolfram Gloger <mtb2003 malloc.de> 2009, Jul 2013
#
# THIS SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,
# EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY
# WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
#
# Requirements:
# POSIX-compliant shell
# imagemagick
# bc
# sed
# unzip  (when operating directly on .kmz input)
# zip    (when generating .kmz)
# printf (if not shell-builtin)
#
#set -x

res_limit="1024*1024"
if test -z "$qual"; then
    qual=75
fi
if test -z "$tdir"; then
    tdir=kmlsplit
fi

case "$1" in
    *.kmz)
	dir="${TMPDIR-/tmp}/kmlsplit$$"
	mkdir -p "$dir"
	test -d "$dir" || exit 1
	delete_dir=yes
	unzip -d "$dir" "$1" || exit 1
	kml=`echo "$dir"/*.kml`
	;;
    *.kml)
	kml="$1"
	dir=`dirname "$kml"`
	delete_dir=no
	;;
    *)
	echo "Usage: [qual=Q] $0 IN.kmz|IN.kml [OUT.kmz]"
	exit 2
	;;
esac
echo "kml=$kml" 1>&2
output="$2"

get_tag () {
    egrep "^[[:space:]]*<$1>.*</$1>" "$kml" |head -1|\
     sed -e "s|^[ \t]*<$1>\(.*\)</$1>|\1|$2"
}

put_float () {
    echo -n "$1" #|sed -e 's|\.|,|'
}

put_tag () {
    echo -n "$1<$2>"
    put_float "$3"
    echo "</$2>"
}

filename=$(get_tag href)
if test -z "$filename"; then
    echo "Image file name not found"
    exit 2
fi
fb=$(basename "$filename"|sed -e 's|\.[a-zA-Z]\+$||'|tr -d ' \t')
#echo "f=|${fb}|" 1>&2

north=`get_tag north ';s|,|.|'`
south=`get_tag south ';s|,|.|'`
east=`get_tag east ';s|,|.|'`
west=`get_tag west ';s|,|.|'`
rot=`get_tag rotation ';s|,|.|'`
draw_order=`get_tag drawOrder`
name=`get_tag name`
description=`get_tag description`
color=`get_tag color`
vbs=`get_tag viewBoundScale ';s|,|.|'`

if test -z "$rot"; then
    rot=0.0
fi
echo "rotation=$rot" 1>&2

set -- `identify -ping "$dir/$filename"|sed -e 's|^.* [A-Z]\+ \([0-9]\+\)x\([0-9]\+\) .*|\1 \2|'`
if test -z "$1" -o -z "$2"; then
    echo "Can't find resolution of '$filename'"
    exit 3
fi
resx=$1
resy=$2

echo "resx=$resx resy=$resy" 1>&2

if test -z "$nx"; then
    nx=1
    ny=1
    rx=$(((($resx/$nx + 15)/16)*16))
    ry=$(((($resy/$ny + 15)/16)*16))
    while test $(($rx*$ry > $res_limit)) != 0; do
	nx=$(($nx + 1))
	ny=$(($ny + 1))
	rx=$(((($resx/$nx + 15)/16)*16))
	ry=$(((($resy/$ny + 15)/16)*16))
    done
else
    rx=$(((($resx/$nx + 15)/16)*16))
    ry=$(((($resy/$ny + 15)/16)*16))
    if test $(($rx*$ry > $res_limit)) != 0; then
	echo "Warning: tiles are larger than 1Mpixel" 1>&2
    fi
fi

echo "nx=$nx ny=$ny rx=$rx ry=$ry" 1>&2
if test $(($rx*$ry > $res_limit)) != 0; then
    echo "Warning: resolution bigger than 1M pix" 1>&2
fi

##################
# start output
mkdir -p "$tdir"
(
egrep "^<\?xml version=.*>" "$kml" ||\
 echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
egrep "^<kml .*>" "$kml" || echo "<kml>"
echo "<Folder>"

iy=0
y=0
while test $(($iy < $ny)) != 0; do
    #n=`echo "$north - ($north - $south)*$iy*$ry/$resy"|bc -l`
    if test $(($y + $ry > $resy)) != 0; then
	ry=$(($resy - $y))
    fi
    #s=`echo "$n - ($north - $south)*$ry/$resy"|bc -l`
    #echo "north=$n south=$s" 1>&2
    ix=0
    x=0
    rx=$(((($resx/$nx + 15)/16)*16))
    while test $(($ix < $nx)) != 0; do
	id=$(printf "0x%0x" $(($iy*$nx+$ix)))
	echo "Processing tile $x $y id=$id" 1>&2

	if test $(($x + $rx > $resx)) != 0; then
	    rx=$(($resx - $x))
	fi

	# crop image tile
	convert "$dir/$filename" \
         -crop ${rx}x${ry}+$x+$y -quality $qual \
         "$tdir/$fb-$iy-$ix.jpg"

	# compute tile coordinates
	set -- `echo "\
scale=15;
phi=$rot*3.1415926535898/180;
lat=($north+$south)/2;
clat=c(lat*3.1415926535898/180);
mx=($east - $west)/(2*$resx);
my=($north-$south)/(2*$resy);
dx=(2*$x+($rx-$resx))*mx*clat;
dy=(($resy-$ry)-2*$y)*my;
cx= (c(phi)*dx - s(phi)*dy)/clat + ($west+$east)/2;
cy= (s(phi)*dx + c(phi)*dy)      + lat;
cx-$rx*mx;
cx+$rx*mx;
cy+$ry*my;
cy-$ry*my;
cx;
cy;
"|bc -l`

	#echo "west=$1 east=$2" 1>&2

	# for checking: tile center as placemarks
	if false; then
	    echo "<Placemark id=\"$id\">"
	    echo " <name>C $iy $ix</name>"
	    echo " <Point>"
	    echo -n " <coordinates>$5,$6,0</coordinates>"
	    echo " </Point>"
	    echo "</Placemark>"
	fi

	echo "\
<GroundOverlay id=\"$id\">"
	put_tag "\t" name        "$name $iy $ix"       
	put_tag "\t" description "$description $iy $ix"
	put_tag "\t" color       "$color"              
	put_tag "\t" drawOrder   "$draw_order"         
	echo "\
\t<Icon>"
	put_tag "\t\t" href           "$fb-$iy-$ix.jpg"
	put_tag "\t\t" viewBoundScale "$vbs"
	echo "\
\t</Icon>
\t<LatLonBox>"
	put_tag "\t\t" north    "$3"  
	put_tag "\t\t" south    "$4"  
	put_tag "\t\t" east     "$2"  
	put_tag "\t\t" west     "$1"  
	put_tag "\t\t" rotation "$rot"
	echo "\
\t</LatLonBox>
</GroundOverlay>"

	x=$(($x + $rx))
	ix=$(($ix + 1))
    done
    y=$(($y + $ry))
    iy=$(($iy + 1))
done

echo "</Folder>"
echo "</kml>"
) >"$tdir/doc.kml"
#
# end output
###############

if test "$delete_dir" = yes; then
    rm -rf "$dir"
fi
if test -n "$output"; then
    zip -n .jpg -j "$output" "$tdir/doc.kml" "$tdir/"*.jpg
fi
